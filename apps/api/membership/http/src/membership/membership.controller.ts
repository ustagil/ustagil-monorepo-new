import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  API_MEMBERSHIP_COMMAND_MS,
  API_MEMBERSHIP_QUERY_MS,
} from '@ustagil/api-constant';
import {
  MembershipGrpcService,
  MembershipHttpCreateResponse,
  MembershipHttpDeleteResponse,
  MembershipHttpListResponse,
  MembershipHttpReadResponse,
  MembershipHttpUpdateResponse,
  MembershipKafkaDeleteRequest,
  MembershipKafkaDeleteResponse,
  MembershipKafkaUpdateRequest,
  MembershipKafkaUpdateResponse,
} from '@ustagil/typing';
import { firstValueFrom, toArray } from 'rxjs';
import {
  MembershipHttpCreateRequestBodyDto,
  MembershipHttpDeleteRequestParamsDto,
  MembershipHttpListRequestQueryDto,
  MembershipHttpReadRequestParamsDto,
  MembershipHttpUpdateRequestBodyDto,
  MembershipHttpUpdateRequestParamsDto,
} from './dto';

@Controller('memberships')
export class MembershipController implements OnModuleInit {
  private membershipGrpcService: MembershipGrpcService;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_MEMBERSHIP_QUERY_MS) private clientGrpc: ClientGrpc,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_MEMBERSHIP_COMMAND_MS) private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.membershipGrpcService =
      this.clientGrpc.getService<MembershipGrpcService>('MembershipService');

    await this.clientKafka.connect();
  }

  @Get()
  async list(
    @Query() query: MembershipHttpListRequestQueryDto,
  ): Promise<MembershipHttpListResponse> {
    const memberships = await firstValueFrom(
      this.membershipGrpcService.list({ query }).pipe(toArray()),
    );

    return memberships;
  }

  @Post()
  create(
    @Body() body: MembershipHttpCreateRequestBodyDto,
  ): MembershipHttpCreateResponse {
    this.clientKafka.emit('membership.create', { body });
  }

  @Get(':id')
  async read(
    @Param() params: MembershipHttpReadRequestParamsDto,
  ): Promise<MembershipHttpReadResponse> {
    const membership = await firstValueFrom(
      this.membershipGrpcService.read({
        params,
      }),
    );

    if (!membership) throw new NotFoundException();

    return membership;
  }

  @Patch(':id')
  update(
    @Param() params: MembershipHttpUpdateRequestParamsDto,
    @Body() body: MembershipHttpUpdateRequestBodyDto,
  ): MembershipHttpUpdateResponse {
    this.clientKafka.emit<
      MembershipKafkaUpdateResponse,
      MembershipKafkaUpdateRequest
    >('membership.update', {
      params,
      body,
    });
  }

  @Delete(':id')
  delete(
    @Param() params: MembershipHttpDeleteRequestParamsDto,
  ): MembershipHttpDeleteResponse {
    this.clientKafka.emit<
      MembershipKafkaDeleteResponse,
      MembershipKafkaDeleteRequest
    >('membership.delete', { params });
  }
}
